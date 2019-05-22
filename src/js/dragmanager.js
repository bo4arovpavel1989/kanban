/* Class defining basic drag and drop behavior */
class DragManager {
  /**
   * Method handles behavior on drag start
   * @param {Object} e - html event ovject
   * @return {Boolean}
   */
  dragStart (e) {
    e.target.setAttribute('id', 'isMoved')
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('Text', e.target.getAttribute('id'))

    return true;
  }

  /**
   * Method reset default drag enter behavior
   * @param {Object} e - html event ovject
   * @return {Boolean}
   */
  dragEnter (e) {
    e.preventDefault()

    return true;
  }

  /**
    * Method reset default drag overr behavior
    * @param {Object} e - html event ovject
    * @return {void}
    */
  dragOver (e) {
    e.preventDefault()
  }

  /**
   * Method defines drop event handler
   * @param {Object} e - html event object
   * @return {Boolean}
   */
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
