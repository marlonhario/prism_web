export interface MarketsAlphabetProps {
    allShown: boolean;
    selectedETAsLength: number;
    sortSecurities: (column: string, order: 'asc' | 'desc') => void;
    onHandleLetterClick: (letter: string) => void;
}