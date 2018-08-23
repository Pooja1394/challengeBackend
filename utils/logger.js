//console for waring
exports.waring=(arg)=>{
    console.log("\x1b[33m%s\x1b[0m",arg);
} 
exports.success=(arg)=>{
    console.log("\x1b[33m%s\x1b[0m",arg);    
}
exports.error = (arg)=>{
    console.log("\x1b[31m%s\x1b[0m",arg);
}
exports.info = (arg)=>{
    console.log("\x1b[36m%s\x1b[0m",arg);
}
exports.infoBg = (arg)=>{
    console.log("\x1b[46m%s\x1b[0m",arg);
}