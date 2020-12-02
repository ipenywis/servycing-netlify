import React from 'react';
import styled, { css, theme } from 'styles/styled-components';
import { Editor, IAllProps } from '@tinymce/tinymce-react';
import { useField, FieldProps } from 'react-final-form';
import { FieldValidator } from 'final-form';
import { ErrorText } from 'components/text';

type TEXTAREA_FIELD = FieldProps<any, any> & IAllProps;

export interface IRichTextEditorProps extends Omit<TEXTAREA_FIELD, 'name'> {
  useFinalForm?: boolean;
  name?: string;
  initialValue?: string;
  id?: string;
  clearErrorOnChange?: boolean;

  validate?: FieldValidator<string>;
  onEditorChange?: (content: string) => void;
}

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditorWrapper = styled.div<any>`
  transition: color, background-color, border, box-shadow 250ms ease-in-out;
  border: 1px solid transparent;

  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${theme.default.dangerLight};
    `};
`;

const Error = styled(ErrorText)`
  height: 20px;
  font-size: 12px;
  margin-top: 2px;
`;

const TOOLBAR =
  'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl';
const PLUGINS =
  'print preview paste importcss searchreplace fullscreen autolink autosave save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons';

const API_KEY = 'n4d52f5l8j69txpovfpgebvkv50ej9spze03xj9vgj14m0dm';

function RichTextEditor(props: IRichTextEditorProps) {
  const {
    id,
    useFinalForm,
    name,
    initialValue,
    validate,
    clearErrorOnChange,
  } = props;

  const init = props.init;

  if (useFinalForm && name) {
    const {
      input,
      meta: { initial, error, touched, submitError, dirtySinceLastSubmit },
    } = useField(name, { initialValue, validate });

    const onEditorChange = (content: string) => {
      props.onEditorChange && props.onEditorChange(content);
      const customEvent = { target: { value: content } };
      input.onChange(customEvent);
    };

    return (
      <EditorContainer>
        <EditorWrapper
          error={
            clearErrorOnChange
              ? !dirtySinceLastSubmit && touched && (error || submitError)
              : touched && (error || submitError)
          }
        >
          <Editor
            apiKey={API_KEY}
            id={id}
            init={init}
            plugins={PLUGINS}
            toolbar={TOOLBAR}
            outputFormat="html"
            value={input.value}
            onEditorChange={onEditorChange}
            onFocus={input.onFocus as any}
            onBlur={input.onBlur as any}
          />
        </EditorWrapper>
        <Error>
          {clearErrorOnChange
            ? !dirtySinceLastSubmit && touched && (error || submitError)
              ? error || submitError
              : ''
            : touched && (error || submitError)
            ? error || submitError
            : ''}
        </Error>
      </EditorContainer>
    );
  } else {
    return (
      <EditorContainer>
        <EditorWrapper>
          <Editor
            apiKey={API_KEY}
            id="editor"
            init={init}
            plugins={PLUGINS}
            toolbar={TOOLBAR}
            outputFormat="html"
            onEditorChange={props.onEditorChange}
          />
        </EditorWrapper>
      </EditorContainer>
    );
  }
}

RichTextEditor.defaultProps = {
  useFinalForm: true,
};

export { RichTextEditor };
