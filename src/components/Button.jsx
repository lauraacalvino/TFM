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
        <buttton
            className = {`btn-base btn--${variant} ${active ? 'active' : ''} ${className}`}
            onClick = {onClick}
            title = {title}
        >
            {children}
        </buttton>
    )
}