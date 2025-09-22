type ButtonType = 'primary' | 'secondary' | 'danger'
function getButtonClass(type: ButtonType): string {
    switch (type) {
        case 'primary':
            return 'a'
        case 'secondary':
            return 'b'
        case 'danger':
            return 'c'
        default:
            const _exhaustiveCheck: never = type
            return _exhaustiveCheck
    }
}
