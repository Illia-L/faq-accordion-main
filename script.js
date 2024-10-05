const section = document.querySelector('.faqs');

section.addEventListener('click', e => {
  const target = e.target;
  console.log(target);
  const isTargetAQuestion = target.classList.contains('faqs-question');
  const isTargetAnOpenButton = target
    .closest('button')
    ?.classList.contains('faqs-button-open');
  const isTargetAnCloseButton = target
    .closest('button')
    ?.classList.contains('faqs-button-close');

  if (!(isTargetAQuestion || isTargetAnOpenButton || isTargetAnCloseButton))
    return;

  const questionBox = target.parentElement;
  const paragraph = questionBox.nextElementSibling;
  const openButton = questionBox.querySelector('.faqs-button-open');
  const closeButton = questionBox.querySelector('.faqs-button-close');

  console.log(questionBox);

  toggleElement(paragraph);
  openButton.classList.toggle('hidden');
  closeButton.classList.toggle('hidden');
});

function collapseElement(element) {
  // get the height of the element's inner content, regardless of its actual size
  const sectionHeight = element.scrollHeight;

  // temporarily disable all css transitions
  const elementTransition = element.style.transition;
  element.style.transition = '';

  // on the next frame (as soon as the previous style change has taken effect),
  // explicitly set the element's height to its current pixel height, so we
  // aren't transitioning out of 'auto'
  requestAnimationFrame(function () {
    element.style.paddingTop = 0 + 'px';
    element.style.height = sectionHeight + 'px';
    element.style.transition = elementTransition;

    // on the next frame (as soon as the previous style change has taken effect),
    // have the element transition to height: 0
    requestAnimationFrame(function () {
      element.style.height = 0 + 'px';
    });
  });

  // mark the section as "currently collapsed"
  element.classList.add('js-collapsed');
}

function expandElement(element) {
  console.log('expandElement runs...');
  // get the height of the element's inner content, regardless of its actual size
  const sectionHeight = element.scrollHeight;

  console.log('sectionHeight: ', sectionHeight);
  // have the element transition to the height of its inner content
  element.style.paddingTop = 24 + 'px';
  element.style.height = (sectionHeight + 24) + 'px';

  // mark the section as "currently not collapsed"
  element.classList.remove('js-collapsed');
}

function toggleElement(element) {
  const isCollapsed = element.classList.contains('js-collapsed');

  if (isCollapsed) {
    expandElement(element);
    section.setAttribute('data-collapsed', 'false');
  } else {
    collapseElement(element);
  }
}
