// @ts-nocheck
import React, { useState, useEffect } from "react";
import * as monaco from "monaco-editor";
import "monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution";
import "monaco-editor/esm/vs/editor/editor.all";
import * as yaml from "js-yaml";

interface YamlEditorProps {
  yamlText: string;
  onYamlChange: (newYamlText: string) => void;
}

const YamlEditor: React.FC<YamlEditorProps> = ({ yamlText, onYamlChange }) => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const monacoEditor = monaco.editor.create(
      document.getElementById("yaml-editor")!,
      {
        value: yamlText,
        language: "yaml",
        tabSize: 2,
        theme: "vs-dark",
        minimap: { enabled: false },
        automaticLayout: true,
      }
    );

    monacoEditor.onDidChangeModelContent(() => {
      const newValue = monacoEditor.getValue();
      onYamlChange(newValue);

      try {
        yaml.load(newValue);
        setIsValid(true);
      } catch (error) {
        setIsValid(false);
      }
    });

    setEditor(monacoEditor);

    onYamlChange(yamlText);

    return () => {
      monacoEditor.dispose();
    };
  }, []);

  useEffect(() => {
    if (editor) {
      // editor.setValue(yamlText);
    }
  }, [editor, yamlText]);

  const editorStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "500px",
    borderTop: isValid ? "0px solid #ccc" : "5px solid red",
    borderBottom: isValid ? "0px solid #ccc" : "5px solid red",
  };

  return (
    <div>
      <h2>YAML</h2>
      <div id="yaml-editor" style={editorStyle} />
    </div>
  );
};

export default YamlEditor;
