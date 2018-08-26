(function () {
    //关闭,父窗口弹出对话框,子窗口直接关闭
    Response.Write("<script language=javascript>window.close();</script>");

//关闭,父窗口和子窗口都不弹出对话框,直接关闭
    Response.Write("<script>");
    Response.Write("{top.opener =null;top.close();}");
    Response.Write("</script>");

//弹出窗口刷新当前页面width=200 height=200菜单。菜单栏,工具条,地址栏,状态栏全没有
    Response.Write("<script language=javascript>window.open('rows.aspx','newwindow','width=200,height=200')</script>");

//弹出窗口刷新当前页面
    Response.Write("<script language=javascript>window.open('rows.aspx')</script>");
    Response.Write("<script>window.open('WebForm2.aspx','_blank');</script>");

//弹出提示窗口跳到webform2.aspx页(在一个IE窗口中)
    Response.Write(" <script language=javascript>alert('注册成功');window.window.location.href='WebForm2.aspx';</script> ");

//关闭当前子窗口,刷新父窗口
    Response.Write("<script>window.opener.location.href=window.opener.location.href;window.close();</script>");
    Response.Write("<script>window.opener.location.replace(window.opener.document.referrer);window.close();</script>");

//子窗口刷新父窗口
    Response.Write("<script>window.opener.location.href=window.opener.location.href;</script>");
    Response.Write("<script>window.opener.location.href='WebForm1.aspx';</script>");

//弹出提示窗口.确定后弹出子窗口(WebForm2.aspx)
    Response.Write("<script language='javascript'>alert('发表成功！');window.open('WebForm2.aspx')</script>");

//弹出提示窗口,确定后,刷新父窗口
    Response.Write("<script>alert('发表成功！');window.opener.location.href=window.opener.location.href;</script>");
})();

   