const storageExist = () => {
    try {
        localStorage.getItem('test');
        return true;
    } catch {
        return false;
    }
}

const getTags = () => (storageExist() && localStorage.getItem('ezpzlogtags')) || [];
const setTags = (tags) => {
    // Bail if we don't have localStorage
    if (!storageExist()) {
        return;
    }
    localStorage.setItem('ezpzlogtags', tags);
};

const ezpzlog = function ezpzlog(...args) {
    if(args.length <= 1) {
        if(args[0] && typeof args[0] === "function") {
            ezpzlog.f = args[0];
            ezpzlog.f("Logging function changed: ", args[0]);
        } else if (args[0] && typeof args[0] === "string") {
            if(!ezpzlog.trackedTags.includes(args[0])) {
                ezpzlog.trackedTags.push(args[0]);
                setTags(ezpzlog.trackedTags);
                ezpzlog.f("Added tag", args[0]);
            } else {
                ezpzlog.trackedTags = ezpzlog.trackedTags.filter(t => t !== args[0]);
                setTags(ezpzlog.trackedTags);
                ezpzlog.f("Removed tag", args[0]);
            }
        }
        ezpzlog.f("Currently tracked tags: ", ...ezpzlog.trackedTags);
    } else if(typeof args[0] === "string" && ezpzlog.trackedTags.includes(args[0])) {
        ezpzlog.f(`[${args[0]}]`, ...(args.slice(1)));
    } else if(args.length > 2 && typeof args[0] === "function" && typeof args[1] === "string" && ezpzlog.trackedTags.includes(args[1])) {
        args[0](...(args.slice(2)));
    }
};

ezpzlog.f = ezpzlog.f || console.log;
ezpzlog.trackedTags = getTags();

if (typeof module !== 'undefined' && module.exports) {
    // We're in nodejs
    module.exports = ezpzlog;
} else {
    // We're in a browser
    window.ezpzlog = ezpzlog;
}
