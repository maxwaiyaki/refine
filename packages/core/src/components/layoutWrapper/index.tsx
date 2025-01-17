import React, { FC, useContext, useEffect } from "react";

import { useRouterContext, useTranslate, useWarnAboutChange } from "@hooks";
import { RefineContext } from "@contexts/refine";
import { IRefineContext } from "@contexts/refine/IRefineContext";
import { LayoutProps, TitleProps } from "../../interfaces";

export interface LayoutWrapperProps {
    dashboard?: boolean;
    Layout?: React.FC<LayoutProps>;
    Sider?: React.FC;
    Header?: React.FC;
    Title?: React.FC<TitleProps>;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
}

/**
 * `<LayoutWrapper>` wraps its contents in **refine's** layout with all customizations made in {@link https://refine.dev/docs/api-references/components/refine-config `<Refine>`} component.
 * It is the default layout used in resource pages.
 * It can be used in custom pages to use global layout.
 *
 * @see {@link https://refine.dev/docs/api-references/components/layout-wrapper} for more details.
 */
export const LayoutWrapper: FC<LayoutWrapperProps> = ({
    children,
    dashboard,
    Layout: LayoutFromProps,
    Sider: SiderFromProps,
    Header: HeaderFromProps,
    Title: TitleFromProps,
    Footer: FooterFromProps,
    OffLayoutArea: OffLayoutAreaFromProps,
}) => {
    const { Layout, Footer, Header, Sider, Title, OffLayoutArea } =
        useContext<IRefineContext>(RefineContext);

    const LayoutToRender = LayoutFromProps ?? Layout;

    return (
        <LayoutToRender
            Sider={SiderFromProps ?? Sider}
            Header={HeaderFromProps ?? Header}
            Footer={FooterFromProps ?? Footer}
            Title={TitleFromProps ?? Title}
            OffLayoutArea={OffLayoutAreaFromProps ?? OffLayoutArea}
            dashboard={dashboard}
        >
            {children}
            <UnsavedPrompt />
        </LayoutToRender>
    );
};

const UnsavedPrompt: React.FC = () => {
    const { Prompt } = useRouterContext();

    const translate = useTranslate();

    const { warnWhen, setWarnWhen } = useWarnAboutChange();

    const warnWhenListener = (e: {
        preventDefault: () => void;
        returnValue: string;
    }) => {
        e.preventDefault();

        e.returnValue = translate(
            "warnWhenUnsavedChanges",
            "Are you sure you want to leave? You have unsaved changes.",
        );

        return e.returnValue;
    };

    useEffect(() => {
        if (warnWhen) {
            window.addEventListener("beforeunload", warnWhenListener);
        }

        return window.removeEventListener("beforeunload", warnWhenListener);
    }, [warnWhen]);

    return (
        <Prompt
            when={warnWhen}
            message={translate(
                "warnWhenUnsavedChanges",
                "Are you sure you want to leave? You have unsaved changes.",
            )}
            setWarnWhen={setWarnWhen}
        />
    );
};
