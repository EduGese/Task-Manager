  <img src="https://github.com/user-attachments/assets/da7506c6-56ed-4037-94ba-2f08775126d2" width="200" height="200" alt="Task Manager Icon">

 <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  
# Task Manager

Effectively manage your tasks, stay organized, and achieve your goals with Task Manager, a powerful and user-friendly Android application.

## Features ✨
- **Effortless Task Management:** Create, edit, or delete tasks with ease.
- **Detailed Task Organization:** Assign names, descriptions, priorities (high, medium, low), tags (work, personal, study, etc.), and due dates (including time) to each task.
- **Reminders:** Set reminders for upcoming tasks with options for 5 minutes, 1 hour, or 1 day before the due date. Local notifications will appear on your device to keep you informed.
- **Multiple Task Views:** Manage your tasks efficiently with various views:
  - Pending Tasks: See upcoming tasks categorized as Past Due, Due Today, and No Due Date.
  - Completed Tasks: Review and track tasks you've marked as completed.
  - Calendar View: Visualize all tasks in a calendar format.
- **Mark as Complete:** Accomplish tasks and mark them as completed (and viceversa) to remove them from your active task lists and disable reminders.
- **Theme Customization:** Switch between dark and light themes to personalize your app experience (App takes device theme by default).
- **Offline Functionality:** Work seamlessly even without an internet connection. The app stores your tasks locally using SQLite for reliable access.
 
## Technologies & Libraries 🛠️
### Core technologies
- **[Angular](https://angular.io/) ^18.0.0:** Used for building the application logic
- **[Ionic Framework](https://ionicframework.com/) ^8.0.0:** Used for building the hybrid mobile app structure and UI components
- **[Capacitor](https://capacitorjs.com/)**:
  - @capacitor/core: ^6.1.0 Provides core functionalities for native device access
  - [@capacitor-community/sqlite plugin](https://github.com/capacitor-community/sqlite): ^6.0.0-alpha.1 (for SQLite database access)
  - @capacitor/android: ^6.1.0 (for Android platform functionalities)
- [java](https://www.oracle.com/java/technologies/downloads/): for android build you need to install a recent version of Java JDK Development Kit
### Development tools (Necessary)
- **[NPM](https://www.npmjs.com/) 10.5.2:** Package manager
- **[Node.js](https://nodejs.org/en) 20.13.1:** Package manager
- **[Angular CLI](https://www.npmjs.com/package/@angular/cli?activeTab=versions):** 18.0.0
### Libraries 
- [rxjs](https://rxjs.dev/) 7.8.0: For reactive programming
- [ionicons](https://ionic.io/ionicons) 7.2.1: Icon library designed for ionic
- [angular-calendar](https://github.com/mattlewis92/angular-calendar) ^0.31.1: Angular component made by [Matt Lewis](https://github.com/mattlewis92)
### IDE's
- VSCode (Recomended)
- Android Studio (Required)
## Demo screen (Screen Recording)
Presentation<video src="https://github.com/user-attachments/assets/2b04ef06-d5c1-4606-a3b3-526bda4ed2be" width="200" />

Task with notificartion<video src="https://github.com/user-attachments/assets/7c3f73f4-8b8f-4da1-9ea6-f916b20a15ab" width="200" />



## Screen shots
### Icon app
  <img src="https://github.com/user-attachments/assets/ff86124c-c1c7-4679-a082-3f035011792c" alt="Icon app" width="200">
  
### Empty Pending Tasks List
 <span>Dark</span>
 <img src="https://github.com/user-attachments/assets/3331b864-0f69-44e0-b145-fe085749b326" alt="Icon app" width="200">
  <span>Light</span>
 <img src="https://github.com/user-attachments/assets/c4a0e737-8e52-4e89-800a-dee71cf73724" alt="Icon app" width="200">

### Empty Completed Tasks List
<span>Dark</span>
 <img src="https://github.com/user-attachments/assets/3c8a983c-7cee-4389-b530-11b20cffd217" alt="Icon app" width="200">
  <span>Light</span>
 <img src="https://github.com/user-attachments/assets/925c1846-c439-46d7-9160-2a52b5b47a62" alt="Icon app" width="200">
 
### Pending Tasks List
<div style="display: flex;">
  <span>Dark</span>
   <img src="https://github.com/user-attachments/assets/5aaf8b84-a61a-4cd3-b846-cc7c503b5009" alt="Icon app" width="200">
   <img src="https://github.com/user-attachments/assets/b7d68af2-8db2-4d4b-aae2-1433a4706397" alt="Icon app" width="200">
   <span>Light</span>
   <img src="https://github.com/user-attachments/assets/9aca7fb6-065e-4c36-a333-33023c30676a" alt="Icon app" width="200">
   <img src="https://github.com/user-attachments/assets/d3085b66-9f4d-4e0d-9938-a3379b7ee440" alt="Icon app" width="200">
</div>

### Completed Tasks List
<div style="display: flex;">
  <span>Dark</span>
   <img src="https://github.com/user-attachments/assets/a582243f-2d84-4674-bfb2-6282e0ed05e9" alt="Icon app" width="200">
   <span>Light</span>
   <img src="https://github.com/user-attachments/assets/11dafbd1-0b73-48a8-8832-0c2e4cb89e25" alt="Icon app" width="200">
</div>

### Sliding options
<div style="display: flex;">
  <span>Mark task</span>
   <img src="https://github.com/user-attachments/assets/0b2ba5ee-2db0-47f6-acc7-53b6988e3c56" alt="Icon app" width="200">
  <span>Delete task</span>
   <img src="https://github.com/user-attachments/assets/b0e3b47e-d63d-4ae7-a289-809607596faa" alt="Icon app" width="200">
  <span>Delete modal confirmation</span>
   <img src="https://github.com/user-attachments/assets/94f4d4fb-8498-4c7d-ac7b-be92893cb776" alt="Icon app" width="200">
</div>

### Task details
<span>Dark</span>
<img src="https://github.com/user-attachments/assets/073965b9-74f3-48a5-a586-f9816edbbdbf" alt="Icon app" width="200">
<span>Light</span>
<img src="https://github.com/user-attachments/assets/c1d289e8-2a8d-4118-ab60-0b8a72b48666" alt="Icon app" width="200">

### New task form
<span>Dark</span>
<img src="https://github.com/user-attachments/assets/347a3424-af92-4ad7-943c-0a075293f5ff" alt="Icon app" width="200">
<img src="https://github.com/user-attachments/assets/abd1ee67-0e83-4b08-ac10-1ed21f1d3d6d" alt="Icon app" width="200">
<span>Light</span>
<img src="https://github.com/user-attachments/assets/2d97e00f-fcdc-4673-8746-463f9788e499" alt="Icon app" width="200">
<img src="https://github.com/user-attachments/assets/6738a110-b1ab-4285-b584-f92f4cc3cb79" alt="Icon app" width="200">

### Calendar view
<span>Dark</span>
<img src="https://github.com/user-attachments/assets/18aa5567-6130-4bac-b2b8-ff574ea3f67c" alt="Icon app" width="150">
<img src="https://github.com/user-attachments/assets/12963a28-b1e0-4fb7-a470-3d3f67df3617" alt="Icon app" width="150">
<img src="https://github.com/user-attachments/assets/76e6522a-a367-4bda-9f4d-8a0db7ad4169" alt="Icon app" width="150">
<span>Light</span>
<img src="https://github.com/user-attachments/assets/f50a3b8f-b924-4e5c-bdd6-046aafcb991f" alt="Icon app" width="150">
<img src="https://github.com/user-attachments/assets/75083ede-cb01-4226-a271-5c9b102e4c52" alt="Icon app" width="150">
<img src="https://github.com/user-attachments/assets/95bde8d7-27dc-4412-b6f3-3b3edcf419c2" alt="Icon app" width="150">

### Local notification 
<img src="https://github.com/user-attachments/assets/9757dda0-6580-475e-8ad8-ad7ef9dd8b21" alt="Icon app" width="200">

## Clone and installation 
### 1/ Clone repository
``git@github.com:EduGese/Task-Manager.git``
### 2/ Install dependencies
``npm install``
### 3/ You need to have installed in your local machine:
- [Android Studio](https://developer.android.com/studio)
- [java](https://www.oracle.com/java/technologies/downloads/): for android build you need to install a recent version of Java JDK Development Kit

## Development server
``ionic serve``
## Build app
``npm run build:native``
## Build for android
``npm run ionic:android``
## License
This project is licensed under the [MIT License](#).



