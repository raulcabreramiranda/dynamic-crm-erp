import React, { Component, useEffect } from 'react';

const JSONEditor = (props: any) => {
  let JSONEditor: any = null;
  const auxWindows: any = window;
  useEffect(() => {
    let json = ['Erro ao carregar o JSON'];
    try {
      json = JSON.parse(props.value);
    } catch (e) {}
    const container = document.getElementById('jsoneditor');
    JSONEditor = new auxWindows.JSONEditor(container, {
      mode: 'code',
      sortObjectKeys: false,
      onChange: function () {
        props.onChange(JSON.stringify(JSONEditor.get()));
      },
    });
    if (typeof props.value === 'string') {
      JSONEditor.set(json);
    } else {
      JSONEditor.set(props.value);
    }
  }, []);
  return <div id="jsoneditor" style={{ width: '100%', height: '410px' }}></div>;
};

export default JSONEditor;
