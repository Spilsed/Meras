use chrono::{Datelike, TimeZone, Utc};
use rusqlite::{params, Connection, Result};
use serde::Serialize;
use tauri::{AppHandle, Manager};
use std::fs;

#[derive(Debug, Serialize)]
pub struct Event {
    id: i32,
    datetime: u64,
    duration: Option<u32>,
    title: String,
    description: Option<String>,
}

fn get_connection(app_handle: AppHandle) -> Connection {
    let app_dir = app_handle
            .path()
            .app_data_dir()
            .expect("failed to get app dir");

    fs::create_dir_all(&app_dir).unwrap();

    Connection::open(format!("{}/meras.db", app_dir.display())).unwrap()
}

#[tauri::command]
pub fn create_database(app_handle: AppHandle) -> Result<(), ()> {
    let conn = get_connection(app_handle);

    conn.execute(
            "CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            datetime UNSIGNED BIG INT NOT NULL,
            duration UNSIGNED INT,
            title TEXT NOT NULL,
            description TEXT
        )",
        [],
    )
    .unwrap();

    Ok(())
}

fn query_events(app_handle: AppHandle) -> Result<Vec<Event>> {
    let conn = get_connection(app_handle);

    let mut stmt = conn.prepare("SELECT id, datetime, duration, title, description FROM events")?;
    let event_iter = stmt.query_map([], |row| {
        Ok(Event {
            id: row.get(0)?,
            datetime: row.get(1)?,
            duration: row.get(2)?,
            title: row.get(3)?,
            description: row.get(4)?,
        })
    })?;

    event_iter.collect()
}

#[tauri::command]
pub fn query_events_between(app_handle: AppHandle, start: u64, end: u64) -> Result<Vec<Event>, String> {
    let conn = get_connection(app_handle);

    let mut stmt = conn.prepare("SELECT id, datetime, duration, title, description FROM events WHERE datetime BETWEEN ?1 AND ?2").map_err(|err| err.to_string())?;
    let event_iter = stmt.query_map(params![start, end], |row| {
        Ok(Event {
            id: row.get(0)?,
            datetime: row.get(1)?,
            duration: row.get(2)?,
            title: row.get(3)?,
            description: row.get(4)?,
        })
    }).map_err(|err| err.to_string())?;

    let mut output = vec![];

    for event in event_iter {
        if event.is_ok() {
        output.push(event.unwrap());
        } else {
            println!("{:?}", event);
        }
    }

    Ok(output)
}

#[tauri::command]
pub fn insert_event(app_handle: AppHandle, datetime: u64, duration: u16, title: &str, description: &str) -> Result<(), String> {
    let conn = get_connection(app_handle);

    conn.execute(
        "INSERT INTO events (datetime, duration, title, description) VALUES (?1, ?2, ?3, ?4)",
        params![datetime, duration, title, description],
    ).map_err(|err| err.to_string())?;

    Ok(())
}

fn update_event(app_handle: AppHandle, id: i32, new_event: Event) -> Result<()> {
    let conn = get_connection(app_handle);

    conn.execute(
        "UPDATE events SET datetime = ?2, duration = ?3, title = ?4, description = ?5 WHERE id = ?1",
        params![
            id,
            new_event.datetime,
            new_event.duration,
            new_event.title,
            new_event.description
        ],
    )?;

    Ok(())
}

fn delete_event(app_handle: AppHandle, id: i32) -> Result<()> {
    let conn = get_connection(app_handle);

    conn.execute("DELETE FROM events WHERE id = ?1", params![id])?;

    Ok(())
}