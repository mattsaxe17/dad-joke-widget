const config = {
  color: 'white',
  bgImage: 'bg_image.jpg'
}

const createWidget = async () => {
  let widget = new ListWidget();

  let req = new Request('https://icanhazdadjoke.com/');
  req.method = 'get';
  req.headers = {
    'Accept': 'application/json'
  }

  let res = await req.loadJSON();

  let text = widget.addText(res.joke);
  text.centerAlignText();

  text.textColor = Color[config.color]();

  if (config.bgImage) {
    let fm = FileManager.iCloud();
    let path = fm.documentsDirectory() + `/${config.bgImage}`;
    widget.backgroundImage = fm.readImage(path);
  }

  return widget;
}

let widget = await createWidget();


if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}

Script.complete();