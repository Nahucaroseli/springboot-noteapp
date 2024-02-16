import { Component } from '@angular/core';
import { Note } from '../Note';
import { NotesService } from 'src/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent {


  notes:Note[];
  showForm:boolean=false;
  selectedCategory: string="";
  showEditForm:boolean=false;
  categories: { name: string, selected: boolean }[] = [
    { name: 'Home', selected: false },
    { name: 'Job', selected: false },
    { name: 'Games', selected: false },
    { name: 'Reminder', selected: false },
    { name: 'Mobile', selected: false },
    { name: 'Family', selected: false },
    { name: 'Health', selected: false },
];
  selectedCategories: string[] = [];

  newNote:Note = new Note();
  noteEdit:Note = new Note();

  constructor(private service:NotesService){
    this.notes = [];
  }




  ngOnInit(){
    this.getNotes();
  }

  getNotes(){
    this.service.getNotes().subscribe(res=>{
      this.notes = res;
    })
  }

  filterbyCategory(category:string){
    if (this.selectedCategory) {
      // Filtra las notas por el nombre de la categoría seleccionada
        this.service.getNotes().subscribe(res=>{
          this.notes = res.filter(note => note.categories.includes(category));
        })
    } else {
      // Si no se selecciona ninguna categoría, muestra todas las notas
      this.service.getNotes().subscribe(res=>{
        this.notes = res;
      });
    }
  }



    toggleForm(){
     this.showForm = !this.showForm;
  }

  toggleEditForm(note:Note) {
    this.noteEdit = {...note};
   
  }

  showFormEdit(){
    this.showEditForm = !this.showEditForm;
  }

  createNote(){
    this.newNote.id = this.notes.length + 1;
    this.selectedCategories = this.categories
        .filter(category => category.selected)
        .map(category => category.name);
    this.newNote.categories = [...this.selectedCategories];
    console.log(this.selectedCategories);
    this.notes.push(this.newNote);
    this.service.createNote(this.newNote);
    console.log(this.newNote);
    this.selectedCategories = [];
    this.newNote = new Note();
    this.showForm = false;
    
  }

  archiveNote(note:Note){
    note.archived = !note.archived;
    this.service.archiveNotes(note);
    console.log(note);
  }


  deleteNote(note:Note){
    this.notes = this.notes.filter((item: Note)=> item!=note);
    this.service.deleteNote(note);
  }



editNote(){
  console.log(this.noteEdit)
  const index = this.notes.findIndex(note => note.id === this.noteEdit.id);
  if(index !== -1){
    this.notes[index].title = this.noteEdit.title;
    this.notes[index].description = this.noteEdit.description;
    this.notes[index].categories = this.categories
    .filter(category => category.selected)
            .map(category => category.name);
    this.service.editNote(this.notes[index]);
  }

  this.showEditForm = false;
}



}
