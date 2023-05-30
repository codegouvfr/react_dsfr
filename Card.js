var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { fr } from "./fr";
import { getLink } from "./link";
import { cx } from "./tools/cx";
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-card> */
export const Card = memo(forwardRef((props, ref) => {
    const { className, title, linkProps, desc, imageUrl, imageAlt, start, detail, end, endDetail, badges, footer, horizontal = false, size = "medium", classes = {}, enlargeLink = false, background = true, border = true, shadow = false, grey = false, iconId, style } = props, rest = __rest(props, ["className", "title", "linkProps", "desc", "imageUrl", "imageAlt", "start", "detail", "end", "endDetail", "badges", "footer", "horizontal", "size", "classes", "enlargeLink", "background", "border", "shadow", "grey", "iconId", "style"]);
    assert();
    const { Link } = getLink();
    return (React.createElement("div", Object.assign({ className: cx(fr.cx("fr-card", enlargeLink && "fr-enlarge-link", horizontal && "fr-card--horizontal", (() => {
            switch (size) {
                case "large":
                    return "fr-card--lg";
                case "small":
                    return "fr-card--sm";
                case "medium":
                    return undefined;
            }
        })(), !background && "fr-card--no-background", !border && "fr-card--no-border", shadow && "fr-card--shadow", grey && "fr-card--grey", iconId !== undefined && iconId), classes.root, className), style: style, ref: ref }, rest),
        React.createElement("div", { className: cx(fr.cx("fr-card__body"), classes.body) },
            React.createElement("div", { className: cx(fr.cx("fr-card__content"), classes.content) },
                React.createElement("h3", { className: cx(fr.cx("fr-card__title"), classes.title) }, linkProps !== undefined ? (React.createElement(Link, Object.assign({}, linkProps, { className: cx(linkProps.className, classes.link) }), title)) : (title)),
                desc !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-card__desc"), classes.desc) }, desc)),
                React.createElement("div", { className: cx(fr.cx("fr-card__start"), classes.start) },
                    start,
                    detail !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-card__detail"), classes.detail) }, detail))),
                React.createElement("div", { className: cx(fr.cx("fr-card__end"), classes.end) },
                    end,
                    endDetail !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-card__detail"), classes.endDetail) }, endDetail)))),
            footer !== undefined && (React.createElement("div", { className: cx(fr.cx("fr-card__footer"), classes.footer) }, footer))),
        imageUrl !== undefined && imageUrl.length && (React.createElement("div", { className: cx(fr.cx("fr-card__header"), classes.header) },
            React.createElement("div", { className: cx(fr.cx("fr-card__img"), classes.img) },
                React.createElement("img", { className: cx(fr.cx("fr-responsive-img"), classes.imgTag), src: imageUrl, alt: imageAlt })),
            badges !== undefined && badges.length && (React.createElement("ul", { className: cx(fr.cx("fr-badges-group"), classes.badges) }, badges.map((badge, i) => (React.createElement("li", { key: i }, badge)))))))));
}));
Card.displayName = symToStr({ Card });
export default Card;
//# sourceMappingURL=Card.js.map