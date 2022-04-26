import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/interfaces/article/article.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
})
export class DashboardCardComponent implements OnInit {
  @Input()
  article!: Article;

  @Output() removeCard = new EventEmitter();

  @Output() editCard = new EventEmitter();

  @Output() clearEdit = new EventEmitter();

  abstractToggle: boolean = false;
  journal_image: string = '';

  constructor() {}

  ngOnInit(): void {
    this.journal_image = this.article.journal.toUpperCase().includes('PLOS ONE')
      ? 'assets/plos.png'
      : 'assets/not_found.png';
  }

  toggleShowAbstract(): void {
    this.abstractToggle = !this.abstractToggle;
  }

  setEditMode(): void {
    this.article.editMode = true;
    this.editCard.emit();
  }

  cancelEditMode(): void {
    this.article.editMode = false;
    this.clearEdit.emit();
  }

  deleteCard(): void {
    Swal.fire({
      title: 'Are you sure about remove this article?',
      showDenyButton: true,
      confirmButtonText: 'Delete it',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeCard.emit();
      }
    });
  }
}
