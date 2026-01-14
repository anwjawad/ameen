/**
 * UI Components Helper
 * Handles custom UI elements like Animated Dropdowns
 */

export function setupCustomDropdowns() {
    // Find all selects that haven't been customized yet
    // filtering by class 'custom-input' or similar if needed, 
    // or just target all selects that are visible and not already wrapped.
    const selects = document.querySelectorAll('select.custom-input:not(.custom-initialized)');

    selects.forEach(select => {
        // Mark as initialized
        select.classList.add('custom-initialized');

        // Create Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';

        // Wrap the select
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);

        // Create Trigger Button
        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        // Set initial text
        const selectedOption = select.options[select.selectedIndex];
        trigger.textContent = selectedOption ? selectedOption.textContent : 'Select';
        wrapper.appendChild(trigger);

        // Create Options List
        const optionsList = document.createElement('div');
        optionsList.className = 'custom-options';

        // Populate Loop
        Array.from(select.options).forEach(opt => {
            const customOpt = document.createElement('div');
            customOpt.className = 'custom-option';
            if (opt.selected) customOpt.classList.add('selected');
            customOpt.textContent = opt.textContent;
            customOpt.dataset.value = opt.value;

            // Handle Click Selection
            customOpt.addEventListener('click', (e) => {
                e.stopPropagation();

                // Update Native Select
                select.value = opt.value;
                select.dispatchEvent(new Event('change')); // Trigger app logic

                // Update Trigger Text
                trigger.textContent = opt.textContent;

                // Update Styles
                wrapper.querySelectorAll('.custom-option').forEach(el => el.classList.remove('selected'));
                customOpt.classList.add('selected');

                // Close Menu
                wrapper.classList.remove('open');
            });

            optionsList.appendChild(customOpt);
        });

        wrapper.appendChild(optionsList);

        // Toggle Open/Close
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other open dropdowns first
            document.querySelectorAll('.custom-select-wrapper.open').forEach(el => {
                if (el !== wrapper) el.classList.remove('open');
            });
            wrapper.classList.toggle('open');
        });
    });

    // Close all when clicking outside
    // We add this listener once to document
    if (!window.customDropdownsInitialized) {
        document.addEventListener('click', (e) => {
            document.querySelectorAll('.custom-select-wrapper.open').forEach(wrapper => {
                if (!wrapper.contains(e.target)) {
                    wrapper.classList.remove('open');
                }
            });
        });
        window.customDropdownsInitialized = true;
    }
}
