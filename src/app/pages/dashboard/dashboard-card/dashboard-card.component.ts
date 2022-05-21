import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from 'src/app/interfaces/article/article.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
})
export class DashboardCardComponent implements OnInit, OnChanges {
  articleForm!: FormGroup;

  @Input()
  article!: Article;

  @Output() removeCard = new EventEmitter();

  abstractToggle: boolean = false;
  journal_image: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      title: [this.article.title_display, Validators.required],
      journal: [this.article.journal, Validators.required],
      abstract: [this.article.abstract, Validators.required],
    });
  }

  ngOnChanges(): void {
    this.journal_image = this.article.journal.toUpperCase().includes('PLOS ONE')
      ? 'assets/plos.png'
      : 'assets/not_found.png';
  }

  update(): void {
    const titleInput = this.articleForm.get('title');
    const journalInput = this.articleForm.get('journal');
    const abstractInput = this.articleForm.get('abstract');

    this.article.title_display = titleInput?.value;
    this.article.journal = journalInput?.value;
    this.article.abstract = abstractInput?.value;

    this.journal_image = this.article.journal.toUpperCase().includes('PLOS ONE')
      ? 'assets/plos.png'
      : 'assets/not_found.png';

    this.toggleEditMode();
  }

  toggleShowAbstract(): void {
    this.abstractToggle = !this.abstractToggle;
  }

  toggleEditMode(): void {
    this.article.editMode = !this.article.editMode;
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
