export class Note{

    id:number;
    title:string;
    description:string;
    archived:boolean;
    categories:string[];


    constructor(){
        this.id = 0;
        this.title = "Note 1";
        this.description = "Description 1";
        this.archived = false;
        this.categories = [];

    }

}