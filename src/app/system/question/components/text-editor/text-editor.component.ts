import {Component, OnInit} from '@angular/core';
import {Editor, NgxEditorComponent, NgxEditorFloatingMenuComponent, NgxEditorMenuComponent, Toolbar} from 'ngx-editor';

@Component({
  selector: 'app-text-editor',
  imports: [NgxEditorComponent, NgxEditorMenuComponent],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent  implements OnInit {
    editor: any;
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    // or, set options for link:
    //[{ link: { showOpenInNewTab: false } }, 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];
  colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];
    ngOnInit(): void {
      this.editor = new Editor({
        content: '',
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
        plugins: [], //https://prosemirror.net/docs/guide/#state
        nodeViews: {}, //https://prosemirror.net/docs/guide/#state,
        attributes: {}, // https://prosemirror.net/docs/ref/#view.EditorProps.attributes
        linkValidationPattern: '',
        parseOptions: {}, // https://prosemirror.net/docs/ref/#model.ParseOptions
      });
    }
}
