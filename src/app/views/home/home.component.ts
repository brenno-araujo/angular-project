import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';
import { PeriodicElement } from 'src/app/models/PeriodicElement';
import { PeriodicElementService } from 'src/app/services/periodicElement.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PeriodicElementService, AuthorService]
})
export class HomeComponent {
  displayedColumns: string[] = ['id', 'title', 'author', 'barcode', 'actions'];
  dataSource!: PeriodicElement[];
  authors!: Author[];
  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    public periodicElementService: PeriodicElementService,
    public authorService: AuthorService
  ) {
    this.periodicElementService.getAll().subscribe((data: PeriodicElement[]) => {
      this.dataSource = data;
    });
    this.authorService.getAll().subscribe((data: Author[]) => {
      this.authors = data;
      console.log(this.authors);
    });
  }

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        id: null,
        author: '',
        author_id: '',
        title: '',
        barcode: '',
        authors: []
      } : {
        id: element.id,
        author: element.author.name,
        author_id: element.author_id,
        title: element.title,
        barcode: element.barcode,
        authors: this.authors
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map((element) => element.id).includes(result.id)) {
          this.dataSource[result.id - 1] = result;
          this.table.renderRows();
        } else {
          this.periodicElementService.create(result).subscribe((result: PeriodicElement) => {
          this.dataSource.push(result);
          this.table.renderRows();
          });
        }
      };
    });
  }

  deleteElement(id: number): void {
    this.periodicElementService.delete(id).subscribe(() => {
    this.dataSource = this.dataSource.filter((element) => element.id !== id);
    });
  }


  // editElement(element: PeriodicElement): void {
  //   this.openDialog(element);
  // }

  editElement(id: number, element: PeriodicElement): void {
    this.openDialog(element)
    this.periodicElementService.update(id, element).subscribe(() => {
      this.dataSource.forEach((elementTwo) => {
        if (element.id === id) {
          element = elementTwo;
        }
      });
    });
  }

}
