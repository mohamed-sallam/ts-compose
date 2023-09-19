# ts-compose
Jetpack Compose Alternative for TypeScript

## Tag Syntax
`<tag_name accepts alphanumeric characters and underscores> {<attributes separated by semicolons or new line>} (<tags separated by commas> | "<string>" | '<string>')` is equivalent to `<tag_name atrributes> tags or string </tag_name>`

### Example
```ts
div {
  "class" = "content"
  style = "color:blue;text-align:center"
} (
  h1 {} ('Aenean Sed Fringilla Neque'),
  textarea {id = 'quote'; readonly = undefined} (
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur finibus turpis, at pulvinar nibh suscipit eget."
  )
)
```
```html
<div class="content" style="color:blue;text-align:center">
    <h1>Aenean Sed Fringilla Neque</h1>
    <textarea id="quote" readonly>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur finibus turpis, at pulvinar nibh suscipit eget.
    </textarea>
</div>
```

## VoidTag Syntax
`$<tag_name accepts alphanumeric characters and underscores> {<attributes separated by semicolons or new line>} [()]` is equivalent to `<tag_name atrributes />`

### Example 
```ts
form {} (
  $img {src = "https://example.com/img.png"} (), 
  $br {},
  $input {type = "text"; id = "fname"; name = "fname"; value = "John"}
)
```
```html
<form>
    <img src="https://example.com/img.png" />
    <br />
    <input type="text" id="fname" name="fname" value="John" />
</form>
```

## Full Example
```ts
html {} (
    body {} (
        h2 {} (
            "HTML Forms"
        ),
        form {
            action = "/action_page.php"
        } (
            label {for = "fname"} ("First name:"),
            $br {},
            $input {type = "text"; id = "fname"; name = "fname"; value = "John"},
            $br {},
            label {for = "lname"} ("Last name:"),
            $br {},
            $input {type = "text"; id = "lname"; name = "lname"; value = "Doe"},
            $br {},
            $input {type = "submit"; value = "Submit"}
        ),
        p {} ('If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".')
    )
)
```
```html
<html>

<body>
    <h2>HTML Forms</h2>
    <form action="/action_page.php">
        <label for="fname">First name:</label>
        <br />
        <input type="text" id="fname" name="fname" value="John" />
        <br />
        <label for="lname">Last name:</label>
        <br />
        <input type="text" id="lname" name="lname" value="Doe" />
        <br />
        <input type="submit" value="Submit" />
    </form>
    <p>If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".</p>
</body>

</html>
```
