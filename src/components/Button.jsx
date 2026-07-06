import './Button.css'

export default function Button ({
    variant = 'nav',
    active = false,
    onClick,
    children,
    title,
    className = '',
}) {
    return (
        <button
            className = {`btn-base btn--${variant} ${active ? 'active' : ''} ${className}`}
            onClick = {onClick}
            title = {title}
        >
            {children}
        </button>
    )
}