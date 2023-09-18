abstract class Tag {
    [index: string]: string | (() => string) | undefined;
    private content: string = "";
    
    public constructor(...tags: Array<Tag | string>) {
        tags.forEach((tag: Tag | string) => {
            this.content += tag.toString();
        });
    }

    public toString(): string {
        return "<" + this.constructor.name + this.getAttributes() + ">" + this.content + "</" + this.constructor.name + ">";
    }

    protected getAttributes(): string {
        return Object.keys(this).reduce((result: string, key: string) => {
            if (key !== 'content')
                result += " " + key + ((typeof this[key] === 'string' || typeof this[key] === 'number') ? '="' + this[key] + '"' : "");
            return result;
        }, "");
    }
}

abstract class VoidTag extends Tag {
    public constructor() {
        super();
    }

    public toString(): string {
        return "<" + this.constructor.name + this.getAttributes() + "/>";
    }
}

function render(code: string): string {
    function preprocessor(code: string): string {
        return code.replace(/(?<=^\s*\$)[A-Za-z0-9-]+(?=\s*\{)/gm, "new class $& extends VoidTag")
                   .replace(/(?<=^\s*)[A-Za-z0-9-]+(?=\s*\{)/gm, "new class $& extends Tag")
                   .replace(/\$/gm, "");
     }
    return eval(preprocessor(code)).toString();
}

/* Manual Test */
// Install `HoodieCollin.es6-string-typescript` extension for highlighting feature in VSCode 
console.log(
    render(/*ts*/`
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
    `)
);
