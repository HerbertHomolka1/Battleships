function Flex({children,flexDirection='row',gap}){
    const flexContainerStyle = {
        display: 'flex',
        flexDirection,
        gap,
        justifyContent: 'center', //center horizontally
        flexWrap: 'wrap'
    };

    return <div style={flexContainerStyle}>{children}</div>
}

export default Flex;