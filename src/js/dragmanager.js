class DragManager {
  dragStart (e) {
    e.target.setAttribute('id', 'isMoved')
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('Text', e.target.getAttribute('id'))

    return true;
  }

  dragEnter (e) {
    e.preventDefault()

    return true;
  }

  dragOver (e) {
    e.preventDefault()
  }

  dragDrop (e) {
    let data = e.dataTransfer.getData('Text');

    e.target.closest('.columnContainer')
            .querySelector('.entries')
            .prepend(document.getElementById(data))

    e.stopPropagation()

    document.getElementById(data).removeAttribute('id')

    return false;
  }
}

module.exports = DragManager
