import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/ext-language_tools";
const Editor = ({ formRef }: any) => {
  const onChange = (newValue: string) => {
    formRef.setFieldValue("permission", newValue);
  };
  return (
    <>
      <AceEditor
        style={{ width: "100%" }}
        mode="json"
        theme="github"
        name="JSON_EDITOR"
        fontSize={14}
        value={formRef.getFieldValue("permission")}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        onChange={onChange}
        setOptions={{
          useWorker: true,
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </>
  );
};

export default Editor;
