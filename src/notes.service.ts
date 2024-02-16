import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from './app/Note';
import { enviroment } from './enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  
  


  url = enviroment.apiBaseUrl;
  constructor(private http:HttpClient) { }




  getNotes(){
    return this.http.get<Note[]>(this.url + `notes`);
  }

  createNote(note:Note){
    this.http.post<Note>(this.url,note).subscribe(
      response=>{

      }
    );
  }


  deleteNote(note:Note){
    this.http.delete<Note>(this.url+`${note.id}`).subscribe(
      response =>{
      }
    )
  }


  editNote(note:Note){
    this.http.put(this.url+`${note.id}`,note).subscribe(
      response=>{

      }
    )
  }


  archiveNotes(note:Note){
    this.http.put(this.url+`${note.id}`,note).subscribe(
      response=>{

      }
    )
  }





}

