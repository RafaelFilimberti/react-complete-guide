

export default function TabButton({ children, onSelect, isSelected }) {
    console.log('tabButton COMPONENT EXECUTIN');

    return (
        <li>
            <button className={isSelected && 'active'} onClick={onSelect}>
                {children}
            </button>
        </li>
    );
}