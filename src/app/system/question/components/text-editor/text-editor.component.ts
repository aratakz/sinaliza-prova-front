import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Editor, NgxEditorComponent, NgxEditorFloatingMenuComponent, NgxEditorMenuComponent, Toolbar} from 'ngx-editor';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  imports: [NgxEditorComponent, NgxEditorMenuComponent, FormsModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent implements OnInit, OnChanges {

  editor: any;
  texto: any;

  @Output() onInputValue = new EventEmitter<string>();
  @Input() defaultText: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.texto = this.defaultText;
  }

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule','indent', 'outdent'],
    ['superscript', 'subscript'],
  ];

  ngOnInit(): void {
    this.editor = new Editor({
      content: '',
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
      plugins: [],
      nodeViews: {},
      attributes: {},
      linkValidationPattern: '',
      parseOptions: {}
    });

    this.texto = this.defaultText;

  }
  onChange(event: any) {
    this.texto = event;
    this.onInputValue.emit(this.texto);
  }


}
