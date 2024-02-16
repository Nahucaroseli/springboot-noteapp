import { Component } from '@angular/core';
import { NotesService } from 'src/notes.service';
import { Note } from '../Note';

@Component({
  selector: 'app-archived-list',
  templateUrl: './archived-list.component.html',
  styleUrls: ['./archived-list.component.css']
})
export class ArchivedListComponent {

  archiveNotes:Note[]=[];
  noteEdit:Note = new Note();
  selectedCategory: string="";
  showEditForm:boolean = false;
  categories: { name: string, selected: boolean }[] = [
    { name: 'Home', selected: false },
    { name: 'Job', selected: false },
    { name: 'Games', selected: false },
    { name: 'Reminder', selected: false },
    { name: 'Mobile', selected: false },
    { name: 'Family', selected: false },
    { name: 'Health', selected: false },
];
  constructor(private service:NotesService){
 
  }



  ngOnInit(){
    this.getArchiveNotes();
  }

  getArchiveNotes(){
    this.service.getNotes().subscribe(res=>{
      this.archiveNotes = res;
    })
  }


  deleteNote(note:Note){
    this.archiveNotes = this.archiveNotes.filter((item: Note)=> item!=note);
    this.service.deleteNote(note);
  }

  editNote(){
    const index = this.archiveNotes.findIndex(note => note.id === this.noteEdit.id);
    if(index !== -1){
      this.archiveNotes[index].title = this.noteEdit.title;
      this.archiveNotes[index].description = this.noteEdit.description;
      this.archiveNotes[index].categories = this.categories
      .filter(category => category.selected)
              .map(category => category.name);
      this.service.editNote(this.archiveNotes[index]);
    }
    this.showEditForm = false;
  }


  toggleEditForm(note:Note) {
    this.noteEdit = {...note};
   
  }


  showFormEdit(){
    this.showEditForm = !this.showEditForm;
  }

  dearchiveNote(note:Note){
    note.archived = !note.archived;
    this.service.archiveNotes(note); 
  }

  filterbyCategory(category:string){
    if (this.selectedCategory) {
      // Filtra las notas por el nombre de la categoría seleccionada
        this.service.getNotes().subscribe(res=>{
          this.archiveNotes = res.filter(note => note.categories.includes(category));
        })
    } else {
      // Si no se selecciona ninguna categoría, muestra todas las notas
      this.service.getNotes().subscribe(res=>{
        this.archiveNotes = res;
      });
    }
  }





}
