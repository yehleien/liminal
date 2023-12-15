/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ArticleCreateFormInputValues = {
    url?: string;
    title?: string;
};
export declare type ArticleCreateFormValidationValues = {
    url?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ArticleCreateFormOverridesProps = {
    ArticleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ArticleCreateFormProps = React.PropsWithChildren<{
    overrides?: ArticleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ArticleCreateFormInputValues) => ArticleCreateFormInputValues;
    onSuccess?: (fields: ArticleCreateFormInputValues) => void;
    onError?: (fields: ArticleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ArticleCreateFormInputValues) => ArticleCreateFormInputValues;
    onValidate?: ArticleCreateFormValidationValues;
} & React.CSSProperties>;
export default function ArticleCreateForm(props: ArticleCreateFormProps): React.ReactElement;
