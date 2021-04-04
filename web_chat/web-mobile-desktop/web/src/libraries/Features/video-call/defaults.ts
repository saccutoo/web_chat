import React from 'react'

export const ContainerStyle: React.CSSProperties = {
    width: '800px',
    height: '400px',
}

export const FrameStyle = (loading: boolean): React.CSSProperties => ({
    display: loading ? 'none' : 'block',
    width: '100%',
    height: '100%',
})
