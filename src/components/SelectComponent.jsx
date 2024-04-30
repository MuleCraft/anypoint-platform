import { useState } from 'react';
import Select from 'react-select';

const SelectComponent = ({ options, selectedRow }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: "100%",
            borderTop: "none",
            fontWeight: "400",
            fontSize: "14px",
            borderBottom: "none",
            borderLeft: state.isFocused ? "2px solid #f4f5f6" : "2px solid #f4f5f6",
            borderRight: state.isFocused ? "2px solid #f4f5f6" : "2px solid #f4f5f6",
            boxShadow: state.isFocused ? "none" : provided.boxShadow,
            borderRadius: 0,
            background: "#f4f5f6",
            padding: "2px",
            "&:hover": {
                borderColor: "#f4f5f6",
            },
        }),
        option: (provided, state) => ({
            ...provided,
            width: "100%",
            display: "flex",
            alignItems: "center",
            borderTop: "none",
            fontWeight: "400",
            fontSize: "14px",
            backgroundColor: state.isSelected ? "#f4f5f6" : "white",
            borderLeft: "2px solid #f4f5f6",
            borderRight: "2px solid #f4f5f6",
            color: "#3a3b3c",
            position: "relative",
            marginTop: "0",

            "&:hover": {
                backgroundColor: state.isSelected ? "#f0f0f0" : "#f8f8f8",
                color: state.isSelected ? "#3a3b3c" : "#00a2df",
                "&::before, &::after": {
                    background: state.isSelected ? "#6B6C6D" : "#00a2df",
                },
            },
            "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: -2,
                bottom: 0,
                width: 2,
                background: state.isSelected ? "#6B6C6D" : "#f4f5f6",
            },
            "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                right: -2,
                bottom: 0,
                width: 2,
                background: state.isSelected ? "#6B6C6D" : "#f4f5f6",
            },
        }),

        menu: (provided) => ({
            ...provided,
            width: "100%",
            borderTop: "none",
            borderRight: "none",
            borderLeft: "none",
            borderBottom: "2px solid #f4f5f6",
            outline: "none",
            marginTop: "0",
            paddingTop: "0",
            paddingBottom: "0",
            borderRadius: "0",
        }),

        indicatorSeparator: () => ({
            display: "none",
        }),

        menuList: (provided) => ({
            ...provided,
            padding: 0,
        }),
    };

    const handleOptionSelect = (selected) => {
        setSelectedOption(selected);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="select-comp">
            <Select
                options={options}
                value={selectedOption}
                onChange={handleOptionSelect}
                onMenuOpen={toggleMenu}
                onMenuClose={toggleMenu}
                isMenuOpen={isMenuOpen}
                closeMenuOnSelect={true}
                styles={customStyles}
                isDisabled={selectedRow === null}
            />
        </div>
    );
};


export default SelectComponent;
