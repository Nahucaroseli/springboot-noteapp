import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArchivedListComponent } from './archived-list/archived-list.component';
import { NoteListComponent } from './note-list/note-list.component';


const routes: Routes = [
  { path: '', redirectTo:'notes',pathMatch:'full'},
  { path: 'notes', component: NoteListComponent },
  { path: 'archived', component: ArchivedListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
