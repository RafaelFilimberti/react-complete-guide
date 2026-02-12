

export default function TabButton({ children, isSelected, ...props }) {
    console.log('tabButton COMPONENT EXECUTIN');

    return (
        <li>
            <button className={isSelected && 'active'} {...props}>
                {children}
            </button>
        </li>
    );
}