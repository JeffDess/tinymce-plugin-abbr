{
  tinymce.PluginManager.requireLangPack('abbr', 'en_US,en_GB,fr_FR');
  tinymce.PluginManager.add('abbr', function (editor) {
    editor.on('PreInit', () => {
      editor.parser.addNodeFilter('abbr', setContentEditable('false'))
      editor.serializer.addNodeFilter('abbr', setContentEditable(null))
    })

    editor.addCommand('mceAbbr', () => {
      const hasTitle = isAbbr(editor.selection.getNode())
      editor.windowManager.open({
        title: 'mceAbbr_title',
        body: [
          {
            type: 'textbox',
            name: 'content',
            size: 40,
            label: 'mceAbbr_contentLabel',
            value: getContent(editor)
          },
          {
          type: 'textbox',
          name: 'title',
          size: 40,
          label: 'mceAbbr_titleLabel',
          value: getTitle(editor)
        },
        {
          type: 'button',
          name: 'delete',
          label: ' ',
          text: 'mceAbbr_deleteBtnText',
          hidden: hasTitle ? false : true,
          onclick: () => {
            removeAbbr(editor)
            editor.windowManager.close()
          }
        }],
        onsubmit: e => insertAbbr(editor, e.data.title, e.data.content),
      })
    })

    editor.addButton('abbr', {
      icon: 'bubble',
      tooltip: 'mceAbbr_tooltip',
      cmd: 'mceAbbr',
      stateSelector: 'abbr:not([title])'
    })

    return {
      getMetadata: () => {
        return {
          name: "Abbr Plugin",
          url: "https://www.github.com/jeffdess/tinymce-plugin-abbr"
        }
      }
    }
  })

  function isAbbr (node) {
    return node.tagName === 'ABBR' && node.hasAttribute('title')
  } 

  function getTitle (editor) {
    return isAbbr(editor.selection.getNode()) 
      ? editor.selection.getNode().title 
      : ''
  }

  function getContent (editor) {
    return isAbbr(editor.selection.getNode()) 
      ? editor.selection.getNode().innerHTML 
      : editor.selection.getContent()
  }

  function setContentEditable (state) {
    return nodes => {
      nodes.forEach(node => {
        if (!isAbbr(node)) {
          node.attr('contenteditable', state)
        }
      })
    }
  }

  function insertAbbr(editor, title, content) {
    const selectedNode = editor.selection.getNode()

    if (isAbbr(selectedNode)) {
      if (title === '' || content === '') {
        removeAbbr(editor, content)
      }
      else {
        selectedNode.removeAttribute('title')
        selectedNode.title = title
        selectedNode.innerHTML = content
      }
    } else {
      editor.focus()
      editor.execCommand('mceInsertContent', false, editor.dom.createHTML('abbr', { title: title }, content))
      editor.selection.collapse(true)
    }
    editor.undoManager.add()
  }

  function removeAbbr(editor, content=null) {
    if (isAbbr(editor.selection.getNode())) {
      editor.selection.setContent(content === null ? getContent() : content)
      editor.undoManager.add()
      editor.selection.collapse(true)
    }
  }
}