export interface GrowthColors {
    color: string;
    stroke: string;
    etaPercentFill: {
        type: 'linear' | 'radial';
        color1: string;
        offset1: string;
        opacity1: string;
        color2: string;
        offset2: string;
        opacity2: string;
    }
}

export interface DivColors extends GrowthColors {
    barFill: string;
    barStroke: string;
}

export const GROWTH_CHART_RED: GrowthColors = {
    color: "text-[#A94447]",
    stroke: "#A74346",
    etaPercentFill: {
        type: 'linear',
        color1: '#551919',
        offset1: '0',
        opacity1: '1',
        color2: '#A94447',
        offset2: '1',
        opacity2: '1',
    }
}

export const GROWTH_CHART_BLUE: GrowthColors = {
    color: "text-[#CBEBF7]",
    stroke: "#AFCBD9",
    etaPercentFill: {
        type: 'radial',
        color1: '#CBEBF7',
        offset1: '0',
        opacity1: '1',
        color2: '#B2D6E8',
        offset2: '1',
        opacity2: '1',
    }
}

export const GROWTH_CHART_GREEN: GrowthColors = {
    color: "text-[#CDEAE4]",
    stroke: "#CDEAE4",
    etaPercentFill: {
        type: 'radial',
        color1: '#CDEAE4',
        offset1: '0',
        opacity1: '1',
        color2: '#CDEAE4',
        offset2: '1',
        opacity2: '1',
    }
}

export const GROWTH_CHART_PURPLE: GrowthColors = {
    color: "text-[#DFE0F1]",
    stroke: "#A74346",
    etaPercentFill: {
        type: 'radial',
        color1: '#BDBED8',
        offset1: '0',
        opacity1: '1',
        color2: '#DFE0F1',
        offset2: '1',
        opacity2: '1',
    }
}

export const GROWTH_CHART_DEFAULT: GrowthColors = {
    color: "text-[#474C55]",
    stroke: "#474C55",
    etaPercentFill: {
        type: 'radial',
        color1: '#474C55',
        offset1: '0',
        opacity1: '1',
        color2: '#474C55',
        offset2: '1',
        opacity2: '1',
    }
}


export const DIV_CHART_RED: DivColors = {
    color: "text-[#F9F2ED]",
    stroke: "#FCF4ED",
    barFill: "#FCF4ED",
    barStroke: "#C1ABA0",
    etaPercentFill: {
        type: 'linear',
        color1: '#FCF4ED',
        offset1: '0',
        opacity1: '1',
        color2: '#C1AA9F',
        offset2: '1',
        opacity2: '1',
    }
}

export const DIV_CHART_BLUE: DivColors = {
    color: "text-[#1A2741]",
    stroke: "#25375A",
    barFill: "#426299B2",
    barStroke: "#1A2741",
    etaPercentFill: {
        type: 'linear',
        color1: 'white',
        offset1: '0',
        opacity1: '1',
        color2: '#426299',
        offset2: '.7',
        opacity2: '1',
    }
}

export const DIV_CHART_GREEN: DivColors = {
    color: "text-[#205544]",
    stroke: "#3D8E74",
    barFill: "#3D8E74",
    barStroke: "#205544",
    etaPercentFill: {
        type: 'linear',
        color1: '#3D8E74',
        offset1: '0',
        opacity1: '1',
        color2: '#3D8E74',
        offset2: '1',
        opacity2: '1',
    }
}

export const DIV_CHART_PURPLE: DivColors = {
    color: "text-[#342C53]",
    stroke: "#342C53",
    barFill: "#7268AF",
    barStroke: "#342C53",
    etaPercentFill: {
        type: 'linear',
        color1: '#7268AF',
        offset1: '0',
        opacity1: '1',
        color2: '#7268AF',
        offset2: '1',
        opacity2: '1',
    }
}

export const DIV_CHART_DEFAULT: DivColors = {
    color: "text-[#474C55]",
    stroke: "#474C55",
    barFill: "#474C55",
    barStroke: "#474C55",
    etaPercentFill: {
        type: 'linear',
        color1: '#7268AF',
        offset1: '0',
        opacity1: '1',
        color2: '#7268AF',
        offset2: '1',
        opacity2: '1',
    }
}