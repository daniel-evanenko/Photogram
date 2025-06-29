import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleDropdownOptions } from '../store/actions/story.actions';


/**
 * A custom hook to manage the state for a single, globally-managed dropdown.
 * @param storyId The unique ID of the component that owns this dropdown (e.g., a story ID or comment ID).
 * @returns An object with `isDropdownOpen` and `handleToggleDropdown`.
 */
export const useDropdown = (storyId: string) => {
    const activeDropdownId = useSelector((storeState: RootState) => storeState.storyModule.activeDropdownId);

    const isDropdownOpen = activeDropdownId === storyId;

    const handleToggleDropdown = () => {
        toggleDropdownOptions(storyId)
    };

    return {
        isDropdownOpen,
        handleToggleDropdown,
    };
};