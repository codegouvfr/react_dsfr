"use client";

import React, {
    memo,
    forwardRef,
    useState,
    useEffect,
    useRef,
    type ReactNode,
    type CSSProperties
} from "react";
import { symToStr } from "tsafe/symToStr";
import { fr, type FrClassName } from "./fr";
import { cx } from "./tools/cx";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { createComponentI18nApi } from "./i18n";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import { getLink, type RegisteredLinkProps } from "./link";

export type NoticeProps = (NoticeProps.NonClosable | NoticeProps.Closable) &
    (NoticeProps.OptionalIcon | NoticeProps.MandatoryIcon);

export namespace NoticeProps {
    type Common = {
        id?: string;
        className?: string;
        classes?: Partial<Record<"root" | "title" | "description" | "close" | "link", string>>;
        title: NonNullable<ReactNode>;
        description?: ReactNode;
        style?: CSSProperties;
        link?: {
            linkProps: RegisteredLinkProps;
            text: ReactNode;
        };
        /** Default: "info" */
        severity?: NoticeProps.Severity;
    };

    export type NonClosable = Common & {
        isClosable?: false;

        isClosed?: never;
        onClose?: never;
    };

    export type Closable = Closable.Controlled | Closable.Uncontrolled;

    export namespace Closable {
        export type Controlled = Common & {
            isClosable: true;
            isClosed: boolean;
            onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
        };

        export type Uncontrolled = Common & {
            isClosable: true;
            onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

            isClosed?: never;
        };
    }

    export type OptionalIcon = {
        severity?: Exclude<Severity, RiskyAlertSeverity | WeatherSeverity>;
        iconDisplayed?: boolean;
    };

    export type MandatoryIcon = {
        severity: RiskyAlertSeverity | WeatherSeverity;
        iconDisplayed?: true;
    };

    type ExtractSeverity<FrClassName> = FrClassName extends `fr-notice--${infer Severity}`
        ? Severity
        : never;

    export type Severity = Exclude<ExtractSeverity<FrClassName>, "no-icon">;

    type ExtractWeatherSeverity<Severity> = Severity extends `weather-${infer _WeatherSeverity}`
        ? Severity
        : never;

    export type WeatherSeverity = ExtractWeatherSeverity<Severity>;

    export type RiskyAlertSeverity = "witness" | "kidnapping" | "attack" | "cyberattack";
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-notice> */
export const Notice = memo(
    forwardRef<HTMLDivElement, NoticeProps>((props, ref) => {
        const {
            id: id_props,
            className,
            classes = {},
            title,
            description,
            link,
            isClosable = false,
            isClosed: props_isClosed,
            onClose,
            style,
            severity = "info",
            iconDisplayed = true,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-notice",
            "explicitlyProvidedId": id_props
        });

        const [isClosed, setIsClosed] = useState(props_isClosed ?? false);

        const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null);

        const refShouldButtonGetFocus = useRef(false);
        const refShouldSetRole = useRef(false);
        const { Link } = getLink();

        useEffect(() => {
            if (props_isClosed === undefined) {
                return;
            }
            setIsClosed((isClosed: boolean) => {
                if (isClosed && !props_isClosed) {
                    refShouldButtonGetFocus.current = true;
                    refShouldSetRole.current = true;
                }

                return props_isClosed;
            });
        }, [props_isClosed]);

        useEffect(() => {
            if (!refShouldButtonGetFocus.current) {
                return;
            }

            if (buttonElement === null) {
                //NOTE: This should not be reachable
                return;
            }

            refShouldButtonGetFocus.current = false;
            buttonElement.focus();
        }, [buttonElement]);

        const onCloseButtonClick = useConstCallback(
            (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                if (props_isClosed === undefined) {
                    //Uncontrolled
                    setIsClosed(true);
                    onClose?.(event);
                } else {
                    //Controlled
                    onClose(event);
                }
            }
        );

        const doNotDisplayIcon = !iconDisplayed;

        const { t } = useTranslation();

        if (isClosed) {
            return null;
        }

        return (
            <div
                id={id}
                className={cx(
                    fr.cx(
                        "fr-notice",
                        `fr-notice--${severity}`,
                        doNotDisplayIcon && "fr-notice--no-icon"
                    ),
                    classes.root,
                    className
                )}
                {...(refShouldSetRole.current && { "role": "notice" })}
                ref={ref}
                style={style}
                {...rest}
            >
                <div className={fr.cx("fr-container")}>
                    <div className={fr.cx("fr-notice__body")}>
                        <p>
                            <span className={cx(fr.cx(`fr-notice__title`), classes.title)}>
                                {title}
                            </span>
                            {description && (
                                <span className={cx(fr.cx("fr-notice__desc"), classes.description)}>
                                    {description}
                                </span>
                            )}
                            {link && (
                                <Link
                                    target="_blank"
                                    rel="noopener external"
                                    {...link.linkProps}
                                    className={cx(
                                        fr.cx("fr-notice__link"),
                                        classes.link,
                                        link.linkProps.className
                                    )}
                                >
                                    {link.text}
                                </Link>
                            )}
                        </p>
                        {/* TODO: Use our button once we have one */}
                        {isClosable && (
                            <button
                                ref={setButtonElement}
                                className={cx(fr.cx("fr-btn--close", "fr-btn"), classes.close)}
                                onClick={onCloseButtonClick}
                            >
                                {t("hide message")}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    })
);

Notice.displayName = symToStr({ Notice });

export default Notice;

const { useTranslation, addNoticeTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Notice }),
    "frMessages": {
        /* spell-checker: disable */
        "hide message": "Masquer le message"
        /* spell-checker: enable */
    }
});

addNoticeTranslations({
    "lang": "en",
    "messages": {
        "hide message": "Hide the message"
    }
});

addNoticeTranslations({
    "lang": "es",
    "messages": {
        /* spell-checker: disable */
        "hide message": "Occultar el mesage"
        /* spell-checker: enable */
    }
});

export { addNoticeTranslations };
