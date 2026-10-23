// src-tauri/src/lib.rs
// Rust-частина застосунку: файлові операції виконуються тут, а не в JavaScript.

use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

// Шлях до файлу notes.json у системній папці даних застосунку
fn notes_file_path(app_handle: &AppHandle) -> Result<PathBuf, String> {
    let dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;

    // Створюємо папку, якщо її ще немає
    fs::create_dir_all(&dir).map_err(|e| e.to_string())?;

    Ok(dir.join("notes.json"))
}

// Команда: прочитати нотатки. Повертає JSON-рядок ("[]", якщо файлу ще немає)
#[tauri::command]
fn load_notes(app_handle: AppHandle) -> Result<String, String> {
    let path = notes_file_path(&app_handle)?;

    if !path.exists() {
        return Ok("[]".to_string());
    }

    fs::read_to_string(path).map_err(|e| e.to_string())
}

// Команда: записати нотатки (JSON-рядок) у файл
#[tauri::command]
fn save_notes(app_handle: AppHandle, notes_json: String) -> Result<(), String> {
    let path = notes_file_path(&app_handle)?;

    fs::write(path, notes_json).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![load_notes, save_notes])
        .run(tauri::generate_context!())
        .expect("помилка під час запуску застосунку Tauri");
}
