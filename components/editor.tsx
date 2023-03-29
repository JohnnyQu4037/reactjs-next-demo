import React, { useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = ({ formRef, readOnly = false }: any) => {
  const onChange = (newValue: string) => {
    formRef.setFieldValue("permission", newValue);
  };
  // useEffect(() => {
  //   console.log(formRef.getFieldsValue());
  // }, []);
  return (
    <>
      <AceEditor
        style={{ width: "100%" }}
        mode="json"
        name="JSON_EDITOR"
        fontSize={14}
        value={formRef.getFieldValue("permission")}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        onChange={onChange}
        readOnly={readOnly}
        setOptions={{
          useWorker: false,
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
