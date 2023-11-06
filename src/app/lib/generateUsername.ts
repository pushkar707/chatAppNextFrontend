export default function generateUsername(name:string, ) {
    const formattedName = name.toLowerCase().replace(/\s/g, '');
    let username = formattedName;
    const temp_list = [];
  
    for (let i = 0; i < 2; i++) {
      temp_list.push(String(Math.floor(Math.random() * 10)));
    }
  
    // Shuffle the temp_list
    for (let i = temp_list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp_list[i], temp_list[j]] = [temp_list[j], temp_list[i]];
    }
  
    username += temp_list.join('');
    return username;
}