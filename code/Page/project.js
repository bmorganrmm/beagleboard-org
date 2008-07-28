function ownername_macro (param)
 {
  return ("" + this.ownername);
 }

function homepage_macro (param)
 {
  return ("" + this.homepage);
 }

function shortdesc_macro (param)
 {
  return ("" + this.shortdesc);
 }

function htmlencode_macro (param)
 {
  return encode("" + eval(param.param));
 }
 
function edit_project_action ()
 {

  if (!session.user || !session.user["name"])
   {
    res.redirect(root.href("login") + "?target=" + this.href());
    return;
   }
  res.handlers["User"] = User();
  
  function cleanField(param)
  {
   if (param)
    return param.replace("\"","&quot;");
   else
    return "";
  }

  this.errmsg = "";

  this.uri = cleanField(this.uri);
  this.lang = cleanField(this.lang);
  this.registrant = cleanField(this.registrant);
  this.pname = cleanField(this.pname);
  this.shortdesc = cleanField(this.shortdesc);
  this.homepage = cleanField(this.homepage);
  this.rssfeed = cleanField(this.rssfeed);

  if
   (
    req.data["submit"]
    && req.data["uri"]
    && req.data["body"]
    && req.data["pname"]
    && req.data["registrant"]
    && req.data["shortdesc"]
   )
   {
    this.user = "" + sessin.user["name"];
    this.time = new Date();
    this.body = req.data["body"];
    this.lang = req.data["lang"];
    this.pname = req.data["pname"];
    this.shortdesc = req.data["shortdesc"];
    this.homepage = req.data["homepage"];
    this.rssfeed = req.data["rssfeed"];
    this.updatetime = new Date();
    this.render_skin = "project";
    this.edit_skin = "edit_project";
    if (this.isTransient())
     {
      this.uri = req.data["uri"];
      this.registrant = req.data["registrant"];
      app.log("Creating '" + this.uri + "'");
      this.pseudoParent.add(this);
     }
    else
     {
      app.log("Replacing '" + this.uri + "' with '" + req.data["uri"] + "'");
      this.uri = req.data["uri"];
     }
    res.redirect(this.href());
    return;
   }
  else if(req.data["submit"])
   {
    if (!req.data["desc"]) this.errmsg = "* Full Description is a required field";
    if (!req.data["shortdesc"]) this.errmsg = "* Short Description/Summary is a required field";
    if (!req.data["pname"]) this.errmsg = "* Project Name is a required field";
    if (!req.data["uri"]) this.errmsg = "* Project Shortname/URI is a required field";
    if (!req.data["registrant"]) this.errmsg = "* Registrant is a required field";
   }
  res.data.title = this.uri + " - edit_project";
  if (this.edit_skin)
   res.data.body = this.renderSkinAsString(this.edit_skin);
  else
   res.data.body = this.renderSkinAsString("edit_project");
  renderSkin("index");
 }

function showProjectInfoTbl_macro (param)
 {
  var str = "";

  function fixUrl (param)
   {
    param = "" + param;
    if
     (
      (param.search("http://") == -1)
      && (param.search("https://") == -1)
     )
     param = "http://" + param;
    return (param);
   }
	
  if ("" + this.homepage != "")
   str += "<tr>\n"
    + "  <td valign=\"top\" class=\"tbl3\" align=\"right\">Homepage</td>\n"
    + "  <td class=\"tbl5\"><a href=\"" + fixUrl(this.homepage) + "\" target=\"_blank\">"
    + fixUrl(this.homepage)
    + "</a></td>"
    + "</tr>";

   if ("" + this.rssfeed != "")
    str += "<tr>\n"
     + "  <td valign=\"top\" class=\"tbl3\" align=\"right\">RSS Feed</td>\n"
     + "  <td class=\"tbl5\"><a href=\"" + fixUrl(this.rssfeed) + "\" target=\"_blank\">"
     + fixUrl(this.rssfeed)
     + "</a></td>"
     + "</tr>";

  return (str);
 }

