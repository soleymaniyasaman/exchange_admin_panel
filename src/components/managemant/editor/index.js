/* eslint-disable react-hooks/exhaustive-deps */
import { default as React, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
 
const DEFAULT_INITIAL_DATA = (props) => {
  return {
    "time": new Date().getTime(),
    "blocks": [
      {
        "type": "header",
        "data": {
          "text": props,
          "level": 1
        }
      },
    ]
  }
}
 
const EDITTOR_HOLDER_ID = 'editorjs';
 
const Editor = (props) => {
  const ejInstance = useRef();
  const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA(props.header_text));
 
  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    }
  }, []);
  const initEditor = () => {
      const editor = new EditorJS({
          holder: EDITTOR_HOLDER_ID,
          logLevel: "ERROR",
          data: editorData,
          onReady: () => {
              ejInstance.current = editor;
            },
            onChange: async () => {
                let content = await this.editorjs.saver.save();
                const savedData = await ejInstance.current.save()

                console.log("editor",savedData)
                // Put your logic here to save this data to your DB
        setEditorData(content);
      },
      autofocus: true,
      tools: { 
        header: Header, 
      }, 
    });
  };
 
  return (
    <React.Fragment>
      <div id={EDITTOR_HOLDER_ID} className="bg-body"> </div>
    </React.Fragment>
  );
}
 
export default Editor;