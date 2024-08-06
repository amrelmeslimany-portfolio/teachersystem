import { Input } from "postcss";
import React from "react";
import { FormItem, FormLabel, FormControl, FormMessage } from "./form";

type Props = {
    label: string;
    input: React.ReactNode;
};

const InputController: React.FC<Props> = ({ input, label }) => {
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>{input}</FormControl>
            <FormMessage />
        </FormItem>
    );
};

export default InputController;
