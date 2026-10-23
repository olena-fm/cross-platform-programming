// Не показувати додаткове вікно консолі у release-збірці на Windows
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    smart_notes_tauri_lib::run()
}
