import { Topbar } from "../components/Topbar";
import { SettingsPanel } from "../components/SettingsPanel";
import { Toolbox } from "../components/Toolbox";
import lz from "lzutf8";
import {
  Wysiwyg,
  Button,
  ButtonContainer,
  Container,
  Text,
  Editor,
  Frame,
  Element
} from "@appquality/craft-blocks";
import { BSGrid, BSCol } from "@appquality/appquality-design-system";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getOnePopup from "../api/getOnePopup";

export default ({}) => {
  let { id } = useParams();
  let [base64, setBase64] = useState(false);
  useEffect(() => {
    if (id) {
      getOnePopup(id).then(data => {
        if (data.content) {
          setBase64(data.content);
        }
      });
    }
  }, [id]);
  let json = false;
  if (base64) {
    json = lz.decompress(lz.decodeBase64(base64));
  }
  if (!json) {
    return <p>Loading</p>;
  }
  return (
    <div style={{ margin: "0 auto", width: "800px" }}>
      <Editor
        resolver={{
          Button,
          Container,
          Text,
          Wysiwyg,
          ButtonContainer
        }}
      >
        <Topbar />
        <div className="aq-mt-3">
          <BSGrid>
            <BSCol size="col-8">
              <div id="editor-area">
                <Frame json={json}></Frame>
              </div>
            </BSCol>
            <BSCol size="col-4">
              <Toolbox />
              <SettingsPanel />
            </BSCol>
          </BSGrid>
        </div>
      </Editor>
    </div>
  );
};
