import { Content } from "common/interfaces/ETAShowcase/Content";
import { ProfileInterface } from "common/interfaces/ETAShowcase/Profile";
import { Security } from "common/interfaces/ETAShowcase/Security";

export interface YieldChartProps {
    activeSecurity: Security;
    color: string;
    barFill: string;
    barStroke: string;
    content: Content;
    profile: ProfileInterface;
}