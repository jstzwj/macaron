## Compare with `marked.js`

Marked.js failed examples count: 4
Macaron failed examples count: 0

**Example633**

Macaron success and marked.js fail

```markdown
Markdown content
mailto:foo@bar.baz

mailto:a.b-c_d@a.b

mailto:a.b-c_d@a.b.

mailto:a.b-c_d@a.b/

mailto:a.b-c_d@a.b-

mailto:a.b-c_d@a.b_

xmpp:foo@bar.baz

xmpp:foo@bar.baz.
Expected Html
<p><a href="mailto:foo@bar.baz">mailto:foo@bar.baz</a></p>
<p><a href="mailto:a.b-c_d@a.b">mailto:a.b-c_d@a.b</a></p>
<p><a href="mailto:a.b-c_d@a.b">mailto:a.b-c_d@a.b</a>.</p>
<p><a href="mailto:a.b-c_d@a.b">mailto:a.b-c_d@a.b</a>/</p>
<p>mailto:a.b-c_d@a.b-</p>
<p>mailto:a.b-c_d@a.b_</p>
<p><a href="xmpp:foo@bar.baz">xmpp:foo@bar.baz</a></p>
<p><a href="xmpp:foo@bar.baz">xmpp:foo@bar.baz</a>.</p>
Actural Html
<p>mailto:foo@bar.baz</p>
<p>mailto:a.b-c_d@a.b</p>
<p>mailto:a.b-c_d@a.b.</p>
<p>mailto:a.b-c_d@a.b/</p>
<p>mailto:a.b-c_d@a.b-</p>
<p>mailto:a.b-c_d@a.b_</p>
<p>xmpp:foo@bar.baz</p>
<p>xmpp:foo@bar.baz.</p>

marked.js html
<p>mailto:<a href="mailto:foo@bar.baz">foo@bar.baz</a></p>
<p>mailto:<a href="mailto:a.b-c_d@a.b">a.b-c_d@a.b</a></p>
<p>mailto:<a href="mailto:a.b-c_d@a.b">a.b-c_d@a.b</a>.</p>
<p>mailto:<a href="mailto:a.b-c_d@a.b">a.b-c_d@a.b</a>/</p>
<p>mailto:a.b-c_d@a.b-</p>
<p>mailto:a.b-c_d@a.b_</p>
<p>xmpp:<a href="mailto:foo@bar.baz">foo@bar.baz</a></p>
<p>xmpp:<a href="mailto:foo@bar.baz">foo@bar.baz</a>.</p>

```

**Example634**

Macaron success and marked.js fail

```markdown
Markdown content
xmpp:foo@bar.baz/txt

xmpp:foo@bar.baz/txt@bin

xmpp:foo@bar.baz/txt@bin.com
Expected Html
<p><a href="xmpp:foo@bar.baz/txt">xmpp:foo@bar.baz/txt</a></p>
<p><a href="xmpp:foo@bar.baz/txt@bin">xmpp:foo@bar.baz/txt@bin</a></p>
<p><a href="xmpp:foo@bar.baz/txt@bin.com">xmpp:foo@bar.baz/txt@bin.com</a></p>
Actural Html
<p>xmpp:foo@bar.baz/txt</p>
<p>xmpp:foo@bar.baz/txt@bin</p>
<p>xmpp:foo@bar.baz/txt@bin.com</p>

marked.js html
<p>xmpp:<a href="mailto:foo@bar.baz">foo@bar.baz</a>/txt</p>
<p>xmpp:<a href="mailto:foo@bar.baz">foo@bar.baz</a>/txt@bin</p>
<p>xmpp:<a href="mailto:foo@bar.baz">foo@bar.baz</a>/<a href="mailto:txt@bin.com">txt@bin.com</a></p>

```

**Example635**

Macaron success and marked.js fail

```markdown
Markdown content
xmpp:foo@bar.baz/txt/bin
Expected Html
<p><a href="xmpp:foo@bar.baz/txt">xmpp:foo@bar.baz/txt</a>/bin</p>
Actural Html
<p>xmpp:foo@bar.baz/txt/bin</p>

marked.js html
<p>xmpp:<a href="mailto:foo@bar.baz">foo@bar.baz</a>/txt/bin</p>

```

**Example657**

Macaron success and marked.js fail

```markdown
Markdown content
<strong> <title> <style> <em>

<blockquote>
  <xmp> is disallowed.  <XMP> is also disallowed.
</blockquote>
Expected Html
<p><strong> &lt;title> &lt;style> <em></p>
<blockquote>
  &lt;xmp> is disallowed.  &lt;XMP> is also disallowed.
</blockquote>
Actural Html
<p><strong> <title> <style> <em></p>
<blockquote>
  <xmp> is disallowed.  <XMP> is also disallowed.
</blockquote>
marked.js html
<p><strong> <title> <style> <em></p>
<blockquote>
  <xmp> is disallowed.  <XMP> is also disallowed.
</blockquote>
```

There are 4 examples are different with marked.js.