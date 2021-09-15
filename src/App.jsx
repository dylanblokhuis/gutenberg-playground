import { useEffect, useState } from '@wordpress/element';
import {
  BlockEditorKeyboardShortcuts,
  BlockEditorProvider,
  BlockList,
  BlockTools,
  BlockInspector,
  WritingFlow,
  ObserveTyping,
} from '@wordpress/block-editor';
import { Popover, SlotFillProvider } from '@wordpress/components';
import { registerCoreBlocks } from '@wordpress/block-library';
import '@wordpress/format-library';

registerCoreBlocks();

function App() {
  const storedBlocksJson = localStorage.getItem('blocks');
  const [blocks, updateBlocks] = useState(storedBlocksJson ? JSON.parse(storedBlocksJson) : []);

  useEffect(() => {
    localStorage.setItem('blocks', JSON.stringify(blocks))
  }, [blocks]);

  return (
    <div className="playground">
      <SlotFillProvider>
        <BlockEditorProvider
          value={blocks}
          onInput={updateBlocks}
          onChange={updateBlocks}
        >
          <div className="playground__sidebar">
            <BlockInspector />
          </div>
          <div className="playground__content">
            <BlockTools>
              <div className="editor-styles-wrapper">
                <BlockEditorKeyboardShortcuts.Register />
                <WritingFlow>
                  <ObserveTyping>
                    <BlockList />
                  </ObserveTyping>
                </WritingFlow>
              </div>
            </BlockTools>
          </div>
          <Popover.Slot />
        </BlockEditorProvider>
      </SlotFillProvider>
    </div>
  )
}

export default App
